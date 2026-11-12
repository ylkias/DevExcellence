import fs from "node:fs";

const TEST_FILE_PATTERNS = [
  /(^|\/)__tests__(\/|$)/i,
  /\.(?:test|spec)\.[cm]?[jt]sx?$/i,
  /(^|\/)test_[^/]+\.py$/i,
  /_test\.py$/i,
  /_test\.go$/i,
  /(?:^|\/)[^/]*(?:Test|Tests)\.(?:java|kt|cs|php)$/i,
  /_spec\.rb$/i,
  /_test\.rb$/i
];

function stripComments(source, extension) {
  if ([".py", ".rb", ".sh"].includes(extension)) {
    return source.split(/\r?\n/).map((line) => line.replace(/^\s*#.*$/, "")).join("\n");
  }
  return source.replace(/\/\*[\s\S]*?\*\//g, " ").replace(/^\s*\/\/.*$/gm, " ");
}

function isTestFile(file) {
  return TEST_FILE_PATTERNS.some((pattern) => pattern.test(file));
}

function findTests(text, extension) {
  if (extension === ".py") return [...text.matchAll(/^\s*(?:async\s+)?def\s+(test_[A-Za-z0-9_]+)\s*\(/gm)];
  if (extension === ".go") return [...text.matchAll(/^\s*func\s+(Test[A-Z][A-Za-z0-9_]*)\s*\(/gm)];
  if ([".java", ".kt"].includes(extension)) {
    return [...text.matchAll(/@Test(?:Factory|Template)?\b[\s\S]{0,180}?\bfun\s+([A-Za-z0-9_]+)|@Test(?:Factory|Template)?\b[\s\S]{0,180}?\b(?:public\s+)?void\s+([A-Za-z0-9_]+)\s*\(/g)];
  }
  if (extension === ".cs") {
    return [...text.matchAll(/\[(?:Fact|Theory|Test|TestCase)(?:[^\]]*)\][\s\S]{0,180}?\b(?:public\s+)?(?:async\s+)?(?:Task|void)\s+([A-Za-z0-9_]+)\s*\(/g)];
  }
  if (extension === ".php") {
    return [...text.matchAll(/\bfunction\s+(test[A-Za-z0-9_]*)\s*\(/g), ...text.matchAll(/#\[Test\]|@test\b/g)];
  }
  if (extension === ".rb") return [...text.matchAll(/\b(?:it|specify)\s*\(?["'][^"']+["']/g)];
  return [...text.matchAll(/\b(?:it|test)\s*(?:\.\s*(?:skip|only|todo|each|concurrent))?\s*\(/g)];
}

function countAssertions(text, extension) {
  const patterns = [
    /\bexpect\s*\(/g,
    /\bassert(?:\.[A-Za-z_$][\w$]*)?\s*\(/g,
    /\b(?:assertThat|assertEquals|assertNotEquals|assertTrue|assertFalse|assertNull|assertNotNull|assertThrows|assertDoesNotThrow)\s*\(/g,
    /\b(?:require|assert)\.[A-Za-z_$][\w$]*\s*\(/g,
    /\b(?:t|self)\.(?:Errorf?|Fatalf?|FailNow|assert[A-Za-z]+)\s*\(/g,
    /\bpytest\.(?:raises|approx)\s*\(/g,
    /\bshould\.(?:equal|be|have|throw|exist)\b/g,
    /\$this->assert[A-Za-z]+\s*\(/g,
    /\b(?:assert_equal|assert_not_equal|assert_true|assert_false|assert_raises)\s*\(/g,
    /\bAssert\.(?:That|Equal|NotEqual|True|False|Throws|DoesNotThrow|NotNull|NotEmpty|Contains)\s*\(/g
  ];
  if (extension === ".py") patterns.push(/^\s*assert\s+/gm);
  if (extension === ".go") patterns.push(/\bt\.(?:Error|Fatal|Fail)/g);
  const locations = new Set();
  for (const pattern of patterns) {
    pattern.lastIndex = 0;
    for (const match of text.matchAll(pattern)) locations.add(match.index);
  }
  return locations.size;
}

function lineAt(text, index) {
  return text.slice(0, index).split("\n").length;
}

export function auditTestFiles(files, options = {}) {
  const results = [];
  const testFiles = files.filter((file) => isTestFile(file.relative));
  const summary = {
    files: testFiles.length,
    testCases: 0,
    assertions: 0,
    filesWithoutAssertions: 0,
    weakAssertionFiles: 0,
    skippedTests: 0,
    filesWithoutNegativeCases: 0
  };
  const maxFileBytes = options.maxFileBytes ?? 1024 * 1024;
  const add = (id, title, severity, status, evidence, file, line) => {
    results.push({ id, title, severity, status, evidence, ...(file ? { file } : {}), ...(line ? { line } : {}) });
  };

  if (!testFiles.length) {
    add("TEST-AI-000", "Arquivos de teste não encontrados", "high", "review",
      "Não foram detectados arquivos com convenções conhecidas (test/spec, tests/, test_*.py, *_test.go etc.). Confirme a estrutura manualmente ou configure convenções adicionais.", "");
    return { summary, results };
  }

  for (const file of testFiles) {
    let text;
    try {
      const stat = fs.statSync(file.full);
      if (stat.size > maxFileBytes) {
        add("TEST-AI-009", "Arquivo de teste excede o limite de análise", "medium", "review",
          "Arquivo maior que o limite estático; análise não realizada.", file.relative);
        continue;
      }
      text = fs.readFileSync(file.full, "utf8");
      if (text.includes("\u0000")) {
        add("TEST-AI-010", "Arquivo de teste não é texto", "medium", "review", "Arquivo não textual não analisado.", file.relative);
        continue;
      }
    } catch {
      add("TEST-AI-010", "Arquivo de teste não pôde ser lido", "medium", "review",
        "O arquivo foi localizado, mas não foi possível ler seu conteúdo.", file.relative);
      continue;
    }

    const extension = file.relative.slice(file.relative.lastIndexOf(".")).toLowerCase();
    const analyzed = stripComments(text, extension);
    const tests = findTests(analyzed, extension);
    const assertions = countAssertions(analyzed, extension);
    summary.testCases += tests.length;
    summary.assertions += assertions;

    if (!tests.length) {
      add("TEST-AI-001", "Arquivo de teste sem casos reconhecidos", "high", "review",
        "O arquivo usa convenção de teste, mas nenhum caso compatível foi reconhecido. Verifique a sintaxe/framework.", file.relative);
    }
    if (tests.length && !assertions) {
      summary.filesWithoutAssertions++;
      add("TEST-AI-002", "Testes sem assertions reconhecidas", "high", "review",
        "Foram identificados casos de teste, mas nenhuma assertion conhecida. O arquivo pode executar código sem validar o resultado.", file.relative);
    }

    const weak = [...analyzed.matchAll(/\b(?:toBeTruthy|toBeFalsy|toBeDefined|toBeUndefined|toBeNull|toMatchSnapshot)\s*\(/g)];
    const meaningful = [...analyzed.matchAll(/\b(?:toEqual|toStrictEqual|toBe|toContain|toMatch|toThrow|toHaveProperty|toHaveLength|toBeInstanceOf|toHaveBeenCalledWith|assertEquals|assertNotEquals|assertTrue|assertFalse|assertThrows|assertThat)\s*\(/g)];
    const staticOnly = [...analyzed.matchAll(/(?:expect\s*\(\s*(?:true|false|null|undefined|\d+|["'][^"']*["'])\s*\)\s*\.\s*to(?:Be|Equal|StrictEqual)\s*\(\s*(?:true|false|null|undefined|\d+|["'][^"']*["'])|assert(?:\.[A-Za-z]+)?\s*\(\s*(?:true|false|null|undefined|\d+|["'][^"']*["'])\s*,\s*(?:true|false|null|undefined|\d+|["'][^"']*["']))/g)];

    if (weak.length && !meaningful.length) {
      summary.weakAssertionFiles++;
      add("TEST-AI-003", "Assertions possivelmente fracas", "medium", "review",
        "O arquivo usa verificações genéricas/snapshot como única evidência. Prefira validar valores, efeitos e regras de negócio esperados.",
        file.relative, lineAt(analyzed, weak[0].index));
    }
    if (staticOnly.length) {
      add("TEST-AI-004", "Possível assertion tautológica", "high", "review",
        "Há comparação entre literais/valores constantes. Confirme se o teste valida comportamento real e não uma condição sempre verdadeira.",
        file.relative, lineAt(analyzed, staticOnly[0].index));
    }

    const skipped = [...analyzed.matchAll(/\b(?:it|test|describe)\s*\.\s*(?:skip|todo)\s*\(|\bx(?:it|test)\s*\(|pytest\.mark\.skip|@Disabled|@Ignore|\bt\.Skip(?:f|Now)?\s*\(/g)];
    summary.skippedTests += skipped.length;
    if (skipped.length) {
      add("TEST-AI-005", "Testes ignorados ou desabilitados", "medium", "review",
        skipped.length + " ocorrência(s) de skip/todo/disabled; confirme se são intencionais e se há prazo para reativação.",
        file.relative, lineAt(analyzed, skipped[0].index));
    }

    const mockOnly = assertions > 0 &&
      /toHaveBeenCalled(?:Times|With)?\s*\(|calledOnce|assert_called(?:_once)?\b/.test(analyzed) &&
      !/toEqual|toStrictEqual|toBe\s*\(|assertEquals|assertThat|assertTrue|assertFalse|assert_response|statusCode|response\.body/i.test(analyzed);
    if (mockOnly) {
      add("TEST-AI-006", "Validação baseada principalmente em mocks", "medium", "review",
        "As assertions parecem focar chamadas internas simuladas. Inclua verificações do resultado observável/contrato quando apropriado.",
        file.relative);
    }

    const negative = /invalid|invalido|inválido|reject|rejeit|denied|forbidden|unauthorized|unauthor|not found|bad request|throws|toThrow|assertThrows|raises|error|erro|exception|exceção|unauthenticated|permission/i.test(analyzed);
    if (tests.length && !negative) {
      summary.filesWithoutNegativeCases++;
      add("TEST-AI-007", "Cenários negativos não identificados", "low", "review",
        "Não foram reconhecidos cenários de entrada inválida, erro, exceção ou acesso negado. Confirme se são relevantes para este módulo.", file.relative);
    }

    const edge = /empty|null|undefined|zero|negative|limite|boundary|edge.?case|overflow|missing|duplicate|duplicad|concorr|timeout|vazio|nulo/i.test(analyzed);
    if (tests.length && !edge) {
      add("TEST-AI-008", "Casos de borda não identificados", "low", "review",
        "Não foram reconhecidos casos de borda. Avalie valores vazios/nulos, limites, duplicidade, concorrência e timeout quando aplicáveis.", file.relative);
    }

    const todo = [...analyzed.matchAll(/\b(?:TODO|FIXME|XXX)\b/gi)];
    if (todo.length) {
      add("TEST-AI-011", "Pendências dentro de arquivos de teste", "low", "review",
        todo.length + " marcador(es) TODO/FIXME/XXX encontrados.", file.relative, lineAt(analyzed, todo[0].index));
    }

    if (tests.length && assertions) {
      add("TEST-AI-012", "Estrutura de teste reconhecida", "info", "info",
        tests.length + " caso(s) e " + assertions + " assertion(s) reconhecidos. Isso não prova que os testes passam nem que detectam regressões.", file.relative);
    }
  }

  return { summary, results };
}

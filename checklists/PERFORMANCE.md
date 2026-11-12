# Performance and scalability checklist

- [ ] Workload, service objectives, and thresholds are defined.
- [ ] p50/p95/p99 latency, throughput, and error rate are measured.
- [ ] CPU, memory, network, disk, queues, and database are observed.
- [ ] Queries, indexes, locks, and connection pools are reviewed.
- [ ] Cache invalidation, consistency, and tenant isolation are defined.
- [ ] Concurrency, queue depth, payload size, and memory growth are bounded.
- [ ] Retries have limits and backoff; timeouts are present.
- [ ] Long-running work is asynchronous when appropriate.
- [ ] Horizontal scaling and shared state are considered.
- [ ] Load, stress, spike, soak, and resilience tests are selected as needed.
- [ ] Capacity claims cite workload, environment, and reproducible evidence.

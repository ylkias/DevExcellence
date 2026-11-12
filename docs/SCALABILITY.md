# Performance and scalability validation

Do not infer scalability from code review alone. Define the workload and acceptance thresholds, measure the application, identify bottlenecks, and repeat the test after remediation.

## Clarify the target

Distinguish registered accounts, authenticated sessions, concurrent active users, concurrent in-flight operations, and requests per second. These are different workload dimensions. A target of 5,000 users must specify realistic user journeys, request mix, think time, arrival rate, ramp-up, test duration, data volume, and infrastructure.

## Measurements

Capture throughput/request rate, latency p50/p95/p99, error and timeout rates, CPU, memory, network and disk I/O, database connections/query latency/locks/pool saturation, queue depth, worker utilization, and retry volume.

## Test types

- Load: expected production workload.
- Stress: progressively exceed expected workload to locate limits.
- Spike: abrupt traffic increase.
- Soak: sustained load to reveal leaks and resource exhaustion.
- Resilience: controlled dependency failures and recovery.

Run only in authorized, isolated environments with safe data and capacity controls. Do not perform denial-of-service testing against production.

## Acceptance

Record environment, versions, workload, thresholds, results, and limitations. A capacity claim is valid only for the documented workload and environment.

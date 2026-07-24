# Academy State Integrity

CodeQuest must keep these values synchronized:

- authenticated profile academy
- `state.activeAcademyId`
- `pq_active_academy`
- `cq_active_academy`
- current academy route
- academy-specific course dataset

`reconcileAcademyState()` is the single boot authority. Generic course navigation is redirected
to the correct academy-specific route before rendering.

The application must never render a course map until the academy has been reconciled.

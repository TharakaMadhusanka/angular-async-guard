## Angular CanDeactivate: Unsaved Changes? Hold On!

Developed on,

1. Angular V19
2. Primeng V19

Detailed guid you can find here medium article :hand: [Angular CanDeactivate: Unsaved Changes? Hold On!](https://www.example.com)

## CanDeactivate Guard Approaches: A Comparison

Angular CanDeactivate Guard Approaches: A Comparison
When implementing CanDeactivate guards in Angular, especially for handling unsaved changes, the architectural approach you choose significantly impacts your application's maintainability, scalability, and testability. This table compares two common patterns: Direct Component Access and utilizing a dedicated ChangeMonitorService.

| Feature | Approach 1 (Direct Component Access)                                                                                                | Approach 2 (ChangeMonitorService)                                                                                       |
| ------- | ----------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------- |
| Pros    | \- Simple for single, isolated cases: Quick to implement if you only have one component and no expectation of reuse.                | \- Decoupling/Loose Coupling: Guard and components are no longer directly dependent.                                    |
|         |                                                                                                                                     | \- Scalability: Easily add more features/components without modifying the guard or existing components.                 |
|         |                                                                                                                                     | \- Extensibility: New monitoring logic or handling strategies can be added to the service without impacting components. |
|         |                                                                                                                                     | \- Maintainability: Changes to unsaved logic are centralized in the service.                                            |
|         |                                                                                                                                     | \- Reusability: The service can be used across multiple routes and modules.                                             |
|         |                                                                                                                                     | \- Testability: Components and the service can be tested independently.                                                 |
|         |                                                                                                                                     | \- Centralized Control: Provides a single source of truth for managing unsaved changes.                                 |
|         |                                                                                                                                     |                                                                                                                         |
| Cons    | \- Tight Coupling: The guard is directly dependent on the component's internal structure and methods.                               | \- Increased Complexity: Requires defining a separate service and a registration mechanism.                             |
|         | \- Limited Scalability: Adding more components with unsaved changes means modifying the guard for each, leading to repetitive code. | \- Initial Setup Overhead: More code to write initially compared to direct access.                                      |
|         | \- Poor Extensibility: Difficult to introduce common or evolving monitoring logic without changing multiple components/guards.      |                                                                                                                         |
|         | \- Reduced Maintainability: Changes to the unsaved logic might require modifications in both components and the guard.              |                                                                                                                         |
|         | \- Violates DRY Principle: Logic for handling unsaved changes might be duplicated across components or guards.                      |                                                                                                                         |

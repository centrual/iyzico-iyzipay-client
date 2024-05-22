
# iyzico-iyzipay-client

## Description
A TypeScript client for the iyzipay API.

**Note: Project doesn't cover all scenarios, only covers some subscription functionalities.**

## Features
- **Request Interception**: Custom interceptors for modifying and handling outgoing requests.
- **Header Generation**: Dynamic header generation strategies for different versions.
- **Utility Functions**: Common utilities for request handling and header generation.

## File Structure
```
src
├── constants.ts
├── interceptors
│   └── iyzicoRequestInterceptor.ts
├── main.ts
├── utils
│   ├── headerGenerator
│   │   ├── IyzicoHeaderGenerator.ts
│   │   ├── IyzicoHeaderGenerator.types.ts
│   │   ├── strategies
│   │   │   ├── v1.ts
│   │   │   └── v2.ts
│   └── utils.ts
```

### `constants.ts`
Contains constant values used across the project.

### `main.ts`
The entry point of the application, initializing and running the core functionalities.

### `interceptors/iyzicoRequestInterceptor.ts`
Defines an interceptor to handle and modify Iyzico API requests.

### `utils/utils.ts`
Contains utility functions that are commonly used throughout the project.

### `utils/headerGenerator/IyzicoHeaderGenerator.ts`
Implements the logic for generating authorization headers required by Iyzico.

### `utils/headerGenerator/IyzicoHeaderGenerator.types.ts`
Defines types and interfaces used by the header generator.

### `utils/headerGenerator/strategies/v1.ts`
Implements version 1 strategy for header generation.

### `utils/headerGenerator/strategies/v2.ts`
Implements version 2 strategy for header generation.

## Installation
To set up the project locally, follow these steps:

1. **Clone the repository:**
   ```bash
   git clone https://github.com/centrual/iyzico-iyzipay-client.git
   cd iyzico-iyzipay-client
   ```

2. **Install dependencies:**
   ```bash
   yarn install
   ```

## Usage
### Compile the project:
   ```bash
   yarn compile
   ```

### Lint the project:
   ```bash
   yarn lint
   ```

### Fix linting issues:
   ```bash
   yarn fix
   ```

### Run the tests:
```bash
yarn test
```

## Contributing
1. Fork the repository
2. Create a new branch (`git checkout -b feature-branch`)
3. Make your changes
4. Commit your changes (`git commit -m 'Add some feature'`)
5. Push to the branch (`git push origin feature-branch`)
6. Open a pull request

## License
This project is licensed under the MIT License.

## Author
{'name': 'Oğuz Özcan', 'email': 'oguz.ozcan@vennyx.com', 'url': 'https://github.com/centrual'}

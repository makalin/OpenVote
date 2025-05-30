# Contributing to OpenVote

Thank you for your interest in contributing to OpenVote! This document provides guidelines and instructions for contributing to the project.

## Code of Conduct

By participating in this project, you agree to abide by our Code of Conduct. Please read it before contributing.

## How to Contribute

### Reporting Bugs

1. Check if the bug has already been reported in the Issues section
2. Use the bug report template
3. Include detailed steps to reproduce
4. Include expected and actual behavior
5. Include screenshots if applicable
6. Include your environment details

### Suggesting Features

1. Check if the feature has already been suggested
2. Use the feature request template
3. Provide a clear description
4. Explain the use case
5. Include any relevant examples

### Pull Requests

1. Fork the repository
2. Create a new branch
3. Make your changes
4. Write or update tests
5. Update documentation
6. Submit a pull request

## Development Setup

1. **Fork and Clone**
   ```bash
   git clone https://github.com/your-username/OpenVote.git
   cd OpenVote
   ```

2. **Install Dependencies**
   ```bash
   npm install
   ```

3. **Set Up Development Environment**
   ```bash
   # Start local blockchain
   npx hardhat node
   
   # Deploy contracts
   npx hardhat run scripts/deploy.js --network localhost
   
   # Start frontend
   npm start
   ```

## Coding Standards

### Smart Contracts

1. **Style Guide**
   - Follow Solidity style guide
   - Use meaningful variable names
   - Add comments for complex logic
   - Include NatSpec comments

2. **Testing**
   - Write unit tests for all functions
   - Include edge cases
   - Test failure scenarios
   - Maintain high coverage

### Frontend

1. **Style Guide**
   - Follow React best practices
   - Use TypeScript
   - Follow ESLint rules
   - Use Prettier for formatting

2. **Testing**
   - Write component tests
   - Test user interactions
   - Test error handling
   - Test responsive design

## Documentation

1. **Code Documentation**
   - Document all functions
   - Include parameter descriptions
   - Document return values
   - Add usage examples

2. **Project Documentation**
   - Update README.md
   - Update relevant docs
   - Add inline comments
   - Document configuration

## Review Process

1. **Code Review**
   - All PRs require review
   - Address review comments
   - Keep PRs focused
   - Update as needed

2. **Testing**
   - All tests must pass
   - New features need tests
   - Update existing tests
   - Test edge cases

## Release Process

1. **Versioning**
   - Follow semantic versioning
   - Update version numbers
   - Update changelog
   - Tag releases

2. **Deployment**
   - Test deployment
   - Verify contracts
   - Update documentation
   - Announce release

## Getting Help

1. **Questions**
   - Check documentation
   - Search issues
   - Ask in discussions
   - Join community

2. **Support**
   - Report issues
   - Request features
   - Ask questions
   - Provide feedback

## Recognition

1. **Contributors**
   - Added to contributors list
   - Mentioned in release notes
   - Featured in documentation
   - Community recognition

2. **Maintainers**
   - Regular contributors
   - Quality contributions
   - Community support
   - Project leadership

## License

By contributing, you agree that your contributions will be licensed under the project's MIT License. 
# OpenVote Deployment Guide

This guide will walk you through the process of deploying OpenVote to various environments.

## Prerequisites

- Node.js >= 18
- MetaMask or similar Ethereum wallet
- Git
- Access to an Ethereum network (mainnet, testnet, or local)

## Local Development Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/makalin/OpenVote.git
   cd OpenVote
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start local blockchain**
   ```bash
   npx hardhat node
   ```

4. **Deploy smart contracts locally**
   ```bash
   npx hardhat run scripts/deploy.js --network localhost
   ```

5. **Start frontend development server**
   ```bash
   npm start
   ```

## Testnet Deployment

1. **Configure environment variables**
   Create a `.env` file in the root directory:
   ```
   PRIVATE_KEY=your_private_key
   INFURA_API_KEY=your_infura_key
   ETHERSCAN_API_KEY=your_etherscan_key
   ```

2. **Update network configuration**
   In `hardhat.config.js`, add your testnet configuration:
   ```javascript
   networks: {
     goerli: {
       url: `https://goerli.infura.io/v3/${INFURA_API_KEY}`,
       accounts: [PRIVATE_KEY]
     }
   }
   ```

3. **Deploy to testnet**
   ```bash
   npx hardhat run scripts/deploy.js --network goerli
   ```

4. **Verify contract**
   ```bash
   npx hardhat verify --network goerli DEPLOYED_CONTRACT_ADDRESS
   ```

## Production Deployment

1. **Build frontend**
   ```bash
   npm run build
   ```

2. **Deploy smart contracts**
   ```bash
   npx hardhat run scripts/deploy.js --network mainnet
   ```

3. **Update frontend configuration**
   Update the contract address in your frontend configuration.

4. **Deploy frontend**
   Choose your preferred hosting service (e.g., Vercel, Netlify, AWS):
   ```bash
   # Example for Vercel
   vercel --prod
   ```

## Security Considerations

1. **Private Keys**
   - Never commit private keys to version control
   - Use environment variables
   - Consider using a hardware wallet for production

2. **Contract Verification**
   - Always verify contracts on Etherscan
   - Include constructor arguments
   - Document all contract interactions

3. **Frontend Security**
   - Enable HTTPS
   - Implement rate limiting
   - Add security headers

## Monitoring

1. **Smart Contract Monitoring**
   - Set up event listeners
   - Monitor gas usage
   - Track contract interactions

2. **Frontend Monitoring**
   - Error tracking
   - Performance monitoring
   - User analytics

## Troubleshooting

Common issues and solutions:

1. **Contract Deployment Fails**
   - Check gas prices
   - Verify network connection
   - Ensure sufficient funds

2. **Frontend Connection Issues**
   - Check MetaMask connection
   - Verify network configuration
   - Clear browser cache

3. **Transaction Failures**
   - Check gas limits
   - Verify user permissions
   - Check contract state

## Maintenance

1. **Regular Updates**
   - Update dependencies
   - Monitor security advisories
   - Apply patches promptly

2. **Backup Procedures**
   - Regular database backups
   - Contract state snapshots
   - Configuration backups

3. **Performance Optimization**
   - Gas optimization
   - Frontend caching
   - Load balancing 
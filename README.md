# AquaFind

![AquaFind Logo](https://via.placeholder.com/150x150.png?text=AquaFind)

## Unlock liquidity: Discover the best prices and availability for your assets, everywhere.

AquaFind helps users find the best prices and availability for their assets across fragmented crypto markets.

## Features

### Real-time Price Comparison

Users can input an asset ticker (e.g., 'ETH', 'WETH') and instantly see the current buy price across multiple integrated exchanges. This feature highlights the best available price, saving users money by ensuring they always buy at the best available price.

### Asset Availability Alerts

Users can set up alerts for specific assets they are looking for but are currently unavailable on their preferred exchanges. They receive a notification when the asset becomes available, ensuring they don't miss out on purchasing sought-after assets.

### Transaction Cost Estimation

For chosen price comparisons, the platform will estimate the total cost, including potential network fees and slippage, for executing a trade across different market combinations. This provides transparency into the true cost of trades, helping users make informed decisions and avoid unexpected expenses.

## Business Model

AquaFind uses a micro-transaction model for monetization:

- **Price Comparisons**: $0.10 per comparison
- **Availability Alerts**: $0.50 per alert

We also offer alternative pricing models:

- **Subscription**: $5/month for unlimited comparisons
- **Freemium**: 5 free comparisons per day, then pay-per-use
- **Transaction-based fees**: Taker fee on trades executed via the platform (if that feature is added later)

## Technical Stack

- **Frontend**: React, Vite, Tailwind CSS
- **Web3**: wagmi, RainbowKit
- **APIs**: Airstack, Reservoir, Alchemy
- **Backend**: Supabase
- **Payments**: Stripe

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn

### Installation

1. Clone the repository:

```bash
git clone https://github.com/your-username/aquafind.git
cd aquafind
```

2. Install dependencies:

```bash
npm install
# or
yarn install
```

3. Create a `.env` file in the root directory with the following environment variables:

```
VITE_AIRSTACK_API_KEY=your_airstack_api_key
VITE_RESERVOIR_API_KEY=your_reservoir_api_key
VITE_ALCHEMY_API_KEY=your_alchemy_api_key
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_KEY=your_supabase_key
VITE_STRIPE_PUBLIC_KEY=your_stripe_public_key
```

4. Start the development server:

```bash
npm run dev
# or
yarn dev
```

5. Open your browser and navigate to `http://localhost:5173`.

## API Documentation

- [Airstack API](docs/api/airstack.md)
- [Reservoir API](docs/api/reservoir.md)
- [Alchemy API](docs/api/alchemy.md)
- [Supabase API](docs/api/supabase.md)
- [Stripe API](docs/api/stripe.md)

## Project Structure

```
aquafind/
├── docs/                  # Documentation
│   └── api/               # API documentation
├── public/                # Public assets
├── src/                   # Source code
│   ├── components/        # React components
│   │   └── ui/            # UI components
│   ├── context/           # React context providers
│   ├── hooks/             # Custom hooks
│   ├── services/          # API services
│   └── types/             # TypeScript types
├── .env                   # Environment variables
├── index.html             # HTML template
├── package.json           # Dependencies and scripts
├── tailwind.config.js     # Tailwind CSS configuration
└── vite.config.js         # Vite configuration
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgements

- [Airstack](https://airstack.xyz/)
- [Reservoir](https://reservoir.tools/)
- [Alchemy](https://alchemy.com/)
- [Supabase](https://supabase.com/)
- [Stripe](https://stripe.com/)
- [wagmi](https://wagmi.sh/)
- [RainbowKit](https://www.rainbowkit.com/)
- [Tailwind CSS](https://tailwindcss.com/)


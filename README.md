# KoinX - Tax Loss Harvesting Tool

A responsive and functional React application built for the **KoinX Frontend Intern Assignment**. This application allows crypto investors to calculate and optimize their capital gains tax liability through Tax Loss Harvesting.

---

## 🚀 Features

- **Pre & Post Harvesting Comparison**:
  - Displays Short-Term (STCG) and Long-Term (LTCG) profits, losses, and net capital gains.
  - Highlights Realised Capital Gains in real-time.
- **Dynamic Tax Savings Calculator**:
  - Interactive selection of holdings automatically re-calculates post-harvesting gains.
  - Displays a dedicated tax savings banner whenever post-harvesting realized capital gain is reduced.
- **Holdings Management Table**:
  - Displays all 25 cryptocurrency holdings with price, quantity, average buy price, and gains/losses.
  - Automatically populates the **Amount to Sell** column upon selecting an asset.
  - Assets sorted logically (opportunities with losses prioritized).
  - Select-All / Deselect-All header checkbox.
  - "View All" expand/collapse toggle (collapses to 5 items initially).
- **Asynchronous Data Handling**:
  - Promise-based mock APIs with simulated network delay (600ms–800ms).
  - Full loading spinners and error handling.
- **Responsive Design**:
  - Modern dark-mode UI with HSL design tokens, responsive cards, and custom scrollbars.

---

## 🛠️ Tech Stack & Architecture

- **Frontend Framework**: React 18 + TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS v4 + Vanilla CSS Design Tokens
- **Icons**: Lucide React
- **State Management**: React Context API (`useContext` + `useReducer`)

---

## 💻 Getting Started Locally

### Prerequisites
- Node.js 18.x or higher
- npm 9.x or higher

### Installation & Run

1. **Clone the repository**:
   ```bash
   git clone <YOUR_GITHUB_REPO_URL>
   cd "Kotlin Assignment"
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Start the development server**:
   ```bash
   npm run dev
   ```
   Open your browser and navigate to `http://localhost:5173`.

4. **Build for production**:
   ```bash
   npm run build
   ```

---

## 📝 Assumptions & Business Logic

1. **Net Capital Gain**: Computed as `Profits - Losses` for STCG and LTCG individually.
2. **Realised Capital Gain**: Sum of Net STCG + Net LTCG.
3. **Harvesting Impact**:
   - Selecting an asset with `STCG / LTCG gain > 0` adds to profits.
   - Selecting an asset with `STCG / LTCG gain < 0` adds the absolute value to losses.
4. **Savings Display**: Tax savings banner appears only when `Pre-harvesting Realised Gain > Post-harvesting Realised Gain`.

function Home({ setPage }) {
  return (
    <>
      <section className="hero">
        <div className="hero-content">
          <h1>💰 Money Tracker</h1>
          <p>
            Take control of your finances by tracking your income, expenses,
            savings, and financial goals—all in one place.
          </p>

          <button
            className="primary-btn"
            onClick={() => setPage("login")}
          >
            Get Started
          </button>
        </div>

        <div className="hero-image">
          <img
            src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
            alt="Finance"
          />
        </div>
      </section>

      {/* Features */}
      <section className="features">
        <div className="feature-card">
          <h3>📊 Expense Tracking</h3>
          <p>Monitor your daily expenses and income with ease.</p>
        </div>

        <div className="feature-card">
          <h3>🎯 Savings Goals</h3>
          <p>Create savings goals and track your progress.</p>
        </div>

        <div className="feature-card">
          <h3>📈 Analytics</h3>
          <p>Visualize your spending habits with charts and reports.</p>
        </div>

        <div className="feature-card">
          <h3>🔒 Secure</h3>
          <p>Your financial data is stored safely and securely.</p>
        </div>
      </section>

      <footer className="footer">
        <p>© 2026 Money Tracker. Manage your money smarter.</p>
      </footer>
    </>
  );
}

export default Home;
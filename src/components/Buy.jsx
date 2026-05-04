import { ethers } from "ethers";

const Buy = ({ state }) => {
  const buyChai = async (event) => {
    event.preventDefault();
    const { contract } = state;

    if (!contract) {
      alert("Contract not loaded. Please connect your wallet.");
      return;
    }

    const name = document.querySelector("#name").value;
    const message = document.querySelector("#message").value;

    if (!name.trim() || !message.trim()) {
      alert("Please fill in both name and message");
      return;
    }

    try {
      console.log("Sending transaction with name:", name, "message:", message);
      const amount = { value: ethers.parseEther("0.001") };
      const transaction = await contract.buyChai(name, message, amount);
      await transaction.wait();
      console.log("Transaction confirmed!");
      
      // Clear form
      document.querySelector("#name").value = "";
      document.querySelector("#message").value = "";
      alert("Thank you for your message!");
    } catch (error) {
      console.error("Transaction error:", error);
      alert("Transaction failed: " + error.message);
    }
  };

  return (
    <section className="card buy-card">
      <h2 className="section-title">Send a chai</h2>
      <form className="form" onSubmit={buyChai}>
        <div className="field">
          <label className="label" htmlFor="name">
            Name
          </label>
          <input
            type="text"
            className="input"
            id="name"
            placeholder="Enter your name"
          />
        </div>
        <div className="field">
          <label className="label" htmlFor="message">
            Message
          </label>
          <textarea
            className="textarea"
            id="message"
            placeholder="Say something nice…"
          />
        </div>
        <div className="button-row">
          <span className="inline-hint">You will send 0.001 ETH</span>
          <button
            type="submit"
            className="button button-primary"
            disabled={!state.contract}
          >
            Pay 0.001 ETH
          </button>
        </div>
      </form>
    </section>
  );
};

export default Buy;

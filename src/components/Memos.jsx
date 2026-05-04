import { useState, useEffect } from "react";

const Memos = ({ state }) => {
  const [memos, setMemos] = useState([]);
  const { contract } = state;

  useEffect(() => {
    if (!contract) return;

    const fetchMemos = async () => {
      try {
        const memosData = await contract.getMemos();
        setMemos(memosData);
      } catch (error) {
        console.error("Error fetching memos:", error);
      }
    };

    fetchMemos();

    const handleNewMemo = async () => {
      try {
        const memosData = await contract.getMemos();
        setMemos(memosData);
      } catch (error) {
        console.error("Error refreshing memos after NewMemo event:", error);
      }
    };

    contract.on("NewMemo", handleNewMemo);

    return () => {
      contract.off("NewMemo", handleNewMemo);
    };
  }, [contract]);

  return (
    <section className="card">
      <div className="memos-header">
        <h2 className="section-title">Messages</h2>
        <span className="count-pill">
          {memos.length === 0
            ? "No messages yet"
            : `${memos.length} message${memos.length > 1 ? "s" : ""}`}
        </span>
      </div>

      {memos.length > 0 ? (
        <div className="memos-list">
          {memos.map((memo, index) => {
            const timestamp =
              typeof memo.timestamp === "bigint"
                ? Number(memo.timestamp)
                : memo.timestamp;

            const timeLabel = new Date(timestamp * 1000).toLocaleString();
            const shortenedAddress = `${memo.from.slice(0, 6)}...${memo.from.slice(-4)}`;

            return (
              <article className="memo-card" key={`${index}-${memo.from}`}>
                <div className="memo-header">
                  <span className="memo-name">{memo.name}</span>
                  <span className="memo-address">{shortenedAddress}</span>
                </div>
                <p className="memo-message">{memo.message}</p>
                <div className="memo-meta">
                  <span className="memo-time">{timeLabel}</span>
                  <span className="chip">0.001 ETH</span>
                </div>
              </article>
            );
          })}
        </div>
      ) : (
        <div className="empty-state">
          No messages yet. Be the first one to buy a chai!
        </div>
      )}
    </section>
  );
};

export default Memos;

function PrintOptions({ color, setColor, copies, setCopies }) {
  return (
    <div
      style={{
        background: "#ffffff",
        padding: "20px",
        borderRadius: "10px",
        marginBottom: "20px",
        boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
      }}
    >
      <h2>🖨️ Print Options</h2>

      <label>
        Print Type:
      </label>

      <select
        value={color}
        onChange={(e) => setColor(e.target.value)}
      >
        <option value="bw">
          Black & White
        </option>

        <option value="color">
          Color
        </option>
      </select>

      <br />
      <br />

      <label>
        Copies:
      </label>

      <input
        type="number"
        min="1"
        value={copies}
        onChange={(e) =>
          setCopies(Number(e.target.value))
        }
      />
    </div>
  );
}

export default PrintOptions;

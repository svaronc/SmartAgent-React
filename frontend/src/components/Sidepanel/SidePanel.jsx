function SidePanel() {
  return (
    <div className="bg-base-200 ml-10 mr-10 border-r-4 border-double">
      <h2>Ticket filters</h2>
      <input type="search" name="search" id="search" placeholder="search" />
      <div>
        <h3>By status</h3>
        <ul>
          <li>
            <input type="checkbox" name="status" id="status" />
            <label htmlFor="status">Open</label>
          </li>
          <li>
            <input type="checkbox" name="status" id="status" />
            <label htmlFor="status">Pending</label>
          </li>
          <li>
            <input type="checkbox" name="status" id="status" />
            <label htmlFor="status">Closed</label>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default SidePanel;

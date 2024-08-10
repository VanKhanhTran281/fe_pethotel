interface DataDropdown {
    data: Dropdowndata[];
  }
  
  const DropDown: React.FC<DataDropdown> = ({ data }) => {
    return (
      <fieldset style={{ border: 'none' }}>
        {data.map((e, i) => (
          <div key={i} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <legend style={{ fontSize: '17px' }}>{e?.listname}</legend>
            <div>
              <label htmlFor="" style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <div>
                  <input type="checkbox" />
                </div>
                <span style={{ fontSize: '13px' }}>{e?.title}</span>
              </label>
            </div>
          </div>
        ))}
      </fieldset>
    );
  };
  
  export default DropDown;
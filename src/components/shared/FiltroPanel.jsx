import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const FiltroPanel = ({ fields, values, onChange }) => {
  const handleChange = (e) => {
    const { name, value } = e.target;
    onChange((prev) => ({ ...prev, [name]: value }));
  };

  const handleDateChange = (name, date) => {
    onChange((prev) => ({ ...prev, [name]: date }));
  };

  return (
    <div className="p-3 mb-3 border bg-light rounded">
      <div className="row">
        {Object.entries(fields).map(([field, config]) => {
          const label = typeof config === "string" ? config : config.label;
          const type = typeof config === "object" ? config.type : "text";
          const options = config.options || [];

          return (
            <div className="col-md-4 mb-2 d-flex flex-column" key={field}>
              <label className="form-label">{label}</label>

              {type === "text" && (
                <input
                  className="form-control"
                  name={field}
                  value={values[field] || ""}
                  onChange={handleChange}
                />
              )}

              {type === "select" && (
                <select
                  className="form-select"
                  name={field}
                  value={values[field]}
                  onChange={handleChange}
                >
                  {options.map((opt, idx) => {
                    if (typeof opt === "object") {
                      return <option key={idx} value={opt.value}>{opt.label}</option>;
                    }
                    return (
                      <option key={idx} value={opt}>
                        {opt === "" ? "Todos" : opt === "true" ? "Activos" : "Inactivos"}
                      </option>
                    );
                  })}
                </select>
              )}

              {type === "date" && (
                <DatePicker
                  selected={values[field]}
                  onChange={(date) => handleDateChange(field, date)}
                  className="form-control"
                  dateFormat="yyyy-MM-dd"
                  placeholderText={label}
                />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default FiltroPanel;

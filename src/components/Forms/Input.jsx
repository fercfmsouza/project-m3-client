import './Input.css';

const Input = ({ label, type, name, value, placeholder, onChange }) => {
  return (
    <div className='wrapper-input'>
      <label htmlFor={name} className='label'>
        {label}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        value={value}
        placeholder={placeholder}
        onChange={onChange}
        className='input'
      />
    </div>
  );
};

export default Input;

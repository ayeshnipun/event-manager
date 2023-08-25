const StylesDropdown = ({ label, onChange, name, value, styles }: any) => {
  return (
    <div className="">
      <label className="mb-2 font-semibold block text-gray-600">{label}</label>
      <select
        name={name}
        id={name}
        onChange={onChange}
        value={value}
        className="w-full rounded-md border border-[#c7c7c7] bg-white py-3 px-6 text-base font-thin text-gray-600 outline-none focus:border-[#6A64F1] focus:shadow-md"
      >
        {styles.map((option: any) => (
          <option key={option.id} value={option.id}>
            {option.code}
          </option>
        ))}
      </select>
    </div>
  );
};

export default StylesDropdown;

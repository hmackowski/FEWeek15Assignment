import React, { useEffect, useState } from 'react';

function Forms() {
  const [num, setNum] = useState('');

  useEffect(() => {
    console.log(num, 'useEffect was triggered');
  }, [num]);

  const handleSubmit = e => {
    e.preventDefault();
    setNum(e.target.elements.name.value);
    e.target.elements.name.value = "";
  }

  return (
    <div>
      <form onSubmit={handleSubmit} className="input-forms">
        <input type="text" name="name" placeholder='Name:' />
        <input type="submit" />
      </form>
      <p>{num}</p>
    </div>
  )
}

export default Forms;

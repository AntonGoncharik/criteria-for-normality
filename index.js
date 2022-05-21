const jerzy = require('jerzy');

let id = 0; 

const removeInput = (e) => {
  document.getElementById(e.target.dataset.id)?.remove()
}

const addInput = () => {  
  const inputNode = document.createElement('input');
  inputNode.type = 'text';
  inputNode.className = 'form-control';
  inputNode.placeholder = 'Enter number';
  inputNode.value = ''
  inputNode.onkeydown = onkeydown;
  
  const closeButtonNode = document.createElement('button');
  closeButtonNode.type = 'button';
  closeButtonNode.className = 'btn-close';
  closeButtonNode.onclick = removeInput;
  closeButtonNode.setAttribute('data-id', id);

  const divFormGroup = document.createElement('div');
  divFormGroup.id = id;
  divFormGroup.className = 'input-group mb-3';

  divFormGroup.appendChild(inputNode);
  divFormGroup.appendChild(closeButtonNode);
  document.querySelector('.inputs').appendChild(divFormGroup);  

  inputNode.focus();

  id++;
};

const onkeydown = (e) => {
  if (e.code === 'Enter') {
    addInput();
  } 

  
  // console.log(/^\d+\./.test(e.key))
  // if (/^\d+\.?\d*$/.test(e.key) || e.key === 'Backspace') {
  //   return true;
  // }

  // return false;
}

const calculate = () => {
  const inputs = document.querySelectorAll('.form-control');
  
  const numbers = [...inputs].map((item) => {
    return +item.value;
  });

  const radio = document.querySelector('.form-check-input:checked[type=radio]');

  let result = '';
  switch (radio.id) {
    case 'normal':
      const v = new jerzy.Vector(numbers);
      const d = new jerzy.Normal(0, 1).dens(v);
      result = JSON.stringify(d, null, 4)
      break;
    case 't':
      break;
    case 'kolmogorov':
      break;
  }

  document.querySelector('.result').textContent = result;
};

addInput();


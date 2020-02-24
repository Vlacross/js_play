
function onDragStart(e) {
  e
    .dataTransfer
    .setData('text/plain', e.target.id);

  let toggledColor;

  switch(e.currentTarget.style.backgroundColor) {
    case 'red':
      toggledColor = 'orange';
      break;
    case 'orange':
      toggledColor = 'yellow';
      break;
    case 'yellow':
      toggledColor = 'green';
      break;
    case 'green':
      toggledColor = 'blue';
      break;
    case 'red':
      toggledColor = 'red';
      break;
    default:
      toggledColor = 'red'
  };

  e
    .currentTarget
    .style
    .backgroundColor = toggledColor;
}

function onDragOver(e) {
  e.preventDefault();
}

function onDrop(e) {
  const id = event
    .dataTransfer
    .getData('text');

  const draggableElement = document.getElementById(id);
  const dropzone = event.target;

  dropzone.appendChild(draggableElement);

  event
    .dataTransfer
    .clearData();
}



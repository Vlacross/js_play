
function onDragStart(e) {
  e
    .dataTransfer
    .setData('text/plain', e.target.id);

  e
    .currentTarget
    .style
    .backgroundColor = 'yellow';
}

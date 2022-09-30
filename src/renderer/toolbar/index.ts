import { ToolbarController } from '@packages/components';

const toolbar = () => {
  const toolbarController = new ToolbarController(document.body, {});
  toolbarController.add({
    status: 'KetchIn',
    handlePen: () => console.log('switch to drawing line mode'),
    handleShape: selectedShape => console.log(`switch to drawing [${selectedShape.type}] shape mode`),
    // TODO: selectedShape 객체의 svg 필드 활용
    handleColor: selectedColor => console.log(`pen color is now [${selectedColor}]`),
    onClear: () => console.log('clear canvas'),
  });
}

export const toggle = (flag: boolean) => {

}

export default toolbar

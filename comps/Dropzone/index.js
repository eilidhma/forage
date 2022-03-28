import { useDrag, useDrop } from 'react-dnd'
import styled from 'styled-components'

const Dropzone = ({
  children=null,
  onDropItem=()=>{},
  acceptType='',
  width=400,
  title='title'
}) => {

  const [{ canDrop, isOver }, drop] = useDrop(() => ({
    accept: acceptType,
    drop: (item, monitor) => {
      onDropItem(item)
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop()
    })
  }))

  return <DropCont
    ref={drop}
    bg={canDrop && isOver ? 'rgba(239, 99, 69, 0.2)' : 'none'}
  >
    <Title>{title}</Title>
    {children}
  </DropCont>
}

const DropCont = styled.div`
  background:${({bg})=> bg};
  border: 1px solid #EF6345;
  min-width: 14.25vw;
  max-width: 14.25vw;
  display:flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
`

const Title = styled.h1`
  background-color: #EF6345;
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 5px;
  margin: 0;
  width: 100%;
`

export default Dropzone
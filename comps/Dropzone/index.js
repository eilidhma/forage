import { useDrag, useDrop } from 'react-dnd'
import styled from 'styled-components'

const DropCont = styled.div`
  height:35vh;
  background:${({bg})=> bg || '#DDD'};
  border: 1px solid pink;
  min-width: ${props=>props.width};
  max-width: ${props=>props.width};
`

const Dropzone = ({
  //props
  children=null,
  onDropItem=()=>{},
  acceptType='',
  width=100,
  title='title'
}) => {
	const [{ canDrop, isOver }, drop] = useDrop(() => ({
    // The type (or types) to accept - strings or symbols
    accept: acceptType,
    drop:(item, monitor)=>{
      onDropItem(item)
    },
    // Props to collect
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop()
    })
  }))

  //console.log(endDrag)

	return <DropCont
      width={width}
			ref={drop}
      bg={canDrop && isOver ? '#999' : '#DDD'}
		>
      <h2>{title}</h2>
      {children}
		</DropCont>
}

export default Dropzone
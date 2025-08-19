const Block = { tag: 'div' }

export const Box = {
  extend: Block,
  style: ({ props }) => ({
    width: '40px',
    height: '40px',
    borderRadius: '10px',
    background: props.active ? '#3C7BD9' : '#E8F1FF'
  }),
  on: {
    beforeUpdate: async (_, element) => {
      const [selectedX, selectedY] = element.parent.state.selectedCoordinates
        .split(', ')
        .map(Number)

      const isActive =
        element.props.x <= selectedX && element.props.y <= selectedY

      if (element.props.active !== isActive) {
        element.props.active = isActive
        return true
      }

      return false
    }
  }
}

export const Grid = {
  extend: Block,
  style: ({ props }) => ({
    margin: 'auto',
    display: 'grid',
    background: 'white',
    gridTemplateColumns: `repeat(${props.sizeX}, 1fr)`,
    gridTemplateRows: `repeat(${props.sizeY}, 1fr)`,
    borderRadius: '10px',
    gap: '8px',
    boxShadow: '0px 2px 10px rgba(0,0,0,.1)',
    padding: '10px',
    width: 'fit-content'
  }),

  props: {
    children: ({ props }) => {
      return new Array(props.sizeX * props.sizeY).fill(0).map((_, index) => {
        const [x, y] = [index % props.sizeX, Math.floor(index / props.sizeX)]

        return {
          id: `box_${x}_${y}`,
          x,
          y
        }
      })
    },
    childExtends: Box
  }
}

export const Modal = {
  state: {
    selectedCoordinates: '',
    totalCellsSelected: '0'
  },
  props: {
    padding: 'Z B',
    background: '#F8F8F8',
    borderRadius: '15px',
    color: 'black'
  },
  P: {
    text: 'Grid Selection',
    props: {
      fontWeight: 'bold'
    }
  },
  Grid: {
    props: ({ state }) => ({
      sizeX: 16,
      sizeY: 8,
      selectedCoordinates: state.selectedCoordinates
    }),
    on: {
      mouseover: (event, _, state) => {
        const target = event.target

        if (target?.id.startsWith('box_')) {
          const [x, y] = target.id.split('_').slice(1).map(Number)

          state.update({
            selectedCoordinates: [x, y].join(', '),
            totalCellsSelected: x * y
          })
        }
      },
      mouseleave: (_, __, state) => {
        state.update({
          selectedCoordinates: '',
          totalCellsSelected: '0'
        })
      }
    }
  },
  Flex: {
    style: {
      paddingTop: '10px',
      width: '100%',
      flexWrap: 'wrap',
      justifyContent: 'space-between'
    },
    children: [
      {
        text: 'Selection coordinates: {{selectedCoordinates}}',
        style: {
          minWidth: '200px'
        }
      },
      {
        text: 'Total cells selected: {{totalCellsSelected}}',
        style: {
          minWidth: '200px',
          textAlign: 'right'
        }
      }
    ]
  }
}

const stylesReactSelect = {
  control: () => ({
    alignItems: 'center',
    backgroundColor: 'hsl(0, 0%, 100%)',
    borderRadius: '6px',
    border: '1px solid #EFEFEF',
    cursor: 'pointer',
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    height: '40px',
    outline: '1px solid transparent',
    position: 'relative',
    transition: 'all 0.3s',
    boxSizing: 'border-box',
    '&:hover, &:focus, &:active': {
      borderColor: '#00A6FF',
      outlineColor: '#00A6FF',
    },
  }),
  menu: () => ({
    backgroundColor: 'rgba(255, 255, 255)',
    borderRadius: '6px',
    boxShadow:
      '0px 0px 0px 0px rgba(0, 78, 97, 0.05), 0px 6px 14px 0px rgba(0, 78, 97, 0.05), 0px 25px 25px 0px rgba(0, 78, 97, 0.05), 0px 56px 34px 0px rgba(0, 78, 97, 0.03), 0px 100px 40px 0px rgba(0, 78, 97, 0.01), 0px 156px 44px 0px rgba(0, 78, 97, 0.00)',
    boxSizing: 'border-box',
    left: 0,
    padding: '10px',
    position: 'absolute',
    top: 'calc(100% + 10px)',
    width: '100%',
    zIndex: 10,
  }),
  option: () => ({
    alignItems: 'center',
    backgroundColor: 'transparent',
    borderRadius: '6px',
    cursor: 'pointer',
    display: 'flex',
    padding: '10px 16px',
    transition: 'all 0.3s',
    '&:hover': {
      backgroundColor: '#D8F3FF',
      color: '#00A6FF',
    },
    '&:active': {
      backgroundColor: '#00C3FF',
      color: '#ffffff',
      transition: 'all 0.1s',
    },
  }),
  valueContainer: () => ({
    alignItems: 'center',
    boxSizing: 'border-box',
    display: 'grid',
    flex: 1,
    flexWrap: 'wrap',
    overflow: 'hidden',
    padding: '0 20px',
    position: 'relative',
  }),
};

export default stylesReactSelect;

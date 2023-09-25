type Certificate = {
  _id: string;
  author: {
    _id: string;
    full_name: string;
  };
  name: string;
};

export default Certificate;

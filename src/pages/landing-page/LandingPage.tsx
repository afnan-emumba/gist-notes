import { Radio } from "antd";

const LandingPage = () => {
  return (
    <div>
      <Radio.Group>
        <Radio.Button value='large'>Large</Radio.Button>
        <Radio.Button value='default'>Default</Radio.Button>
        <Radio.Button value='small'>Small</Radio.Button>
      </Radio.Group>
    </div>
  );
};

export default LandingPage;

import { keyframes } from 'styled-components';

const width0To100 = keyframes`
  from {
    width: 0%;
  }
  to {
    width: 100%
  }
`;
const fadeInUp = keyframes`
  from {
    opacity: 0;
    top: 5rem;
  }
  to{
    opacity: 1;
    top: 0;
  }
`;
const slideInRight = keyframes`
  from {
    right: -500px;
  }
  to{
    right: 0;
  }
`;

const gradientWave = keyframes`
0% {
  background-position: 0% 50%
}
50% {
  background-position: 100% 50%
}
100% 
  background-position: 0% 50%
}
`;

const Animations = {
  width0To100,
  fadeInUp,
  slideInRight,
  gradientWave,
};

export default Animations;

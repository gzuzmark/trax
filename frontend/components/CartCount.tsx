import { relative } from 'node:path/win32';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import styled from 'styled-components';

const Dot = styled.div`
  background: var(--yellow);
  color: black;
  border-radius: 50%;
  padding: 8px;
  line-height: 32px;
  min-width: 48px;
  margin-left: 16px;
  font-feature-settings: 'tnum';
  font-variant-numeric: tabular-nums;
`;

const AnimationStyles = styled.span`
  position: relative;
  .count {
    display: block;
    position: relative;
    transition: all 0.4s;
    backface-visibility: hidden;
  }
  .count-enter {
    transform: scale(4) rotateX(0.5turn);
  }

  .count-enter-active {
    transform: rotateX(0);
    background: var(--red);
  }

  .count-exit {
    top: 0;
    position: absolute;
    transform: rotateX(0);
  }

  .count-exit-active {
    background: pink;
    transform: scale(4) rotateX(0.5turn);
  }
`;

const CartCount = ({ count }: { count: number }) => {
  console.log('🚀 ~ file: CartCount.tsx ~ line 13 ~ CartCount ~ count', count);
  return (
    <AnimationStyles>
      <TransitionGroup>
        <CSSTransition
          unmountOnExit
          classNames="count"
          className="count"
          key={count}
          timeout={{ enter: 400, exit: 400 }}
        >
          <Dot>{count}</Dot>
        </CSSTransition>
      </TransitionGroup>
    </AnimationStyles>
  );
};

export default CartCount;

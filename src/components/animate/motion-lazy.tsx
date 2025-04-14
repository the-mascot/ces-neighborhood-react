import { FeatureBundle, LazyMotion, m } from 'framer-motion';

// ----------------------------------------------------------------------

// eslint-disable-next-line import/extensions
const loadFeatures = (): Promise<void> => import('./features.js').then((res: FeatureBundle) => res.default);

type Props = {
  children: React.ReactNode;
};

function MotionLazy({ children }: Props): JSX.Element {
  return (
    <LazyMotion strict features={loadFeatures}>
      <m.div style={{ height: '100%' }}> {children} </m.div>
    </LazyMotion>
  );
}

export default MotionLazy;

import skeletonClasses from './Skeleton.module.scss';

export default function Skeleton() {
  return <span role="alert" aria-busy className={skeletonClasses.root} />;
}

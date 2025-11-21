import moment from 'moment';

const CountingDown = ({ counter, opensIn }) => {
  return (
    <div className="fadeInUp text-center space-y-1">
      <p className="text-xs font-semibold uppercase tracking-wide text-primary">Opens in</p>
      <p className="text-4xl font-bold text-ink font-mono">{counter}</p>
      <p className="text-sm font-semibold text-ink/70">
        {moment.utc(opensIn).format('Do of MMMM, h A')} UTC
      </p>
    </div>
  );
};

export default CountingDown;

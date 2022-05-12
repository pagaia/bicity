import ExternalLink from '../ExternalLink';

const BetaVersion = () => {
    return (
        <div className="beta-version">
            <ExternalLink
                url="https://github.com/pagaia/bicity/issues"
                title="Have you find a bug? please add to git issue">
                BETA VERSION
            </ExternalLink>
        </div>
    );
};

export default BetaVersion;

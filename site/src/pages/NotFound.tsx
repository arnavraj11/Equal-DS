import { Link } from '../app/router';
import { Page } from '../ui/kit';

export default function NotFound() {
  return (
    <Page title="Nothing here" lead="That page doesn’t exist, or it moved when Storybook was retired." toc={false}>
      <p className="s-p" style={{ marginTop: 24 }}>
        Press <span className="s-kbd">⌘K</span> to search tokens, components, icons and screens, or go back to the <Link to="/">App Map</Link>.
      </p>
    </Page>
  );
}

import { Asset, assetNames, assetUsage, categories, CategoryAvatar, hasAsset } from '@equal/ds';
import { H2, Page } from '../../ui/kit';

export default function Assets() {
  const missing = assetNames.filter((n) => !hasAsset(n));
  const supplied = assetNames.filter((n) => hasAsset(n));
  const Row = ({ n }: { n: (typeof assetNames)[number] }) => (
    <tr>
      <td><div style={{ display: 'flex', gap: 14, alignItems: 'center' }}><Asset name={n} size={44} radius={8} /><code>{n}</code></div></td>
      <td>{assetUsage[n]}</td>
      <td>{hasAsset(n) ? <span className="s-pill s-pill--ok">supplied</span> : <span className="s-pill">missing</span>}</td>
    </tr>
  );
  return (
    <Page title="Image assets" lead="Image assets are the only visuals that aren’t code. Drop <name>.png / .webp / .svg into equal-ds/assets/ for web, and replace res/drawable/ds_asset_<name>.xml with a same-named PNG or WebP for Android. Missing files render a checkerboard at the exact size.">
      <H2>Still to supply</H2>
      <p className="s-p"><span className="s-num">{missing.length}</span> slots are waiting for artwork.</p>
      <table className="s-table"><thead><tr><th>Asset</th><th>Used by</th><th>Status</th></tr></thead><tbody>{missing.map((n) => <Row key={n} n={n} />)}</tbody></table>
      <H2>Supplied</H2>
      <table className="s-table"><thead><tr><th>Asset</th><th>Used by</th><th>Status</th></tr></thead><tbody>{supplied.map((n) => <Row key={n} n={n} />)}</tbody></table>
      <H2>Categories and generated art</H2>
      <p className="s-p">All 16 caller-category icons are supplied (<code>assets/category-*.webp</code>, Android <code>drawable-xxxhdpi/ds_category_*.webp</code>). The logo is a vector trace, and the chat wallpaper is a mask rendered from BG pattern.svg; the sources live in <code>tokens/brand/</code>.</p>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12 }}>{categories.map((c) => <CategoryAvatar key={c} category={c} size={44} />)}</div>
    </Page>
  );
}

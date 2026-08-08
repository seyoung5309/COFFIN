import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Quick_Link.css';

const cards = [
	{ title: '지도', desc: '우리 동네 주변 카페 확인하기', link: '#' },
	{ title: '프로모션', desc: '우리 동네 주변 카페 확인하기', link: '#' },
	{ title: '카페인 차트', desc: '우리 동네 주변 카페 확인하기', link: '#' },
];

export default function Quick_Link() {
	return (
		<section className="quick-link">
			<h2 className="ql-title">서비스 바로가기</h2>

			<div className="ql-cards">
				{cards.map((c, i) => {
					const isExternal = /^https?:\/\//.test(c.link) || c.link.startsWith('mailto:');
					const CardInner = (
						<div className="ql-card-inner">
							<h3>{c.title}</h3>
							<p>{c.desc}</p>
							<span className="ql-arrow" aria-hidden="true">›</span>
						</div>
					);

					return isExternal ? (
						<a key={i} href={c.link} className="ql-card" aria-label={c.title} target="_blank" rel="noopener noreferrer">
							{CardInner}
						</a>
					) : (
						<Link key={i} to={c.link} className="ql-card" aria-label={c.title}>
							{CardInner}
						</Link>
					);
				})}
			</div>
		</section>
	);
}


export default function Seal({ size = 96, className = "", tone = "gold" }) {
    const ink = tone === "navy" ? "#14213d" : tone === "mono" ? "currentColor" : "#b0892d";
    const id = `seal-${tone}`;
    return (
        <svg viewBox="0 0 200 200" width={size} height={size} className={className}
             role="img" aria-label="Barangay Sta. Filomena official seal" fill="none">
            <defs>
                <path id={`ring-${id}`} d="M100,100 m-78,0 a78,78 0 1,1 156,0 a78,78 0 1,1 -156,0" />
            </defs>
            <circle cx="100" cy="100" r="96" stroke={ink} strokeWidth="1.5" opacity="0.5" />
            <circle cx="100" cy="100" r="90" stroke={ink} strokeWidth="3" />
            <circle cx="100" cy="100" r="60" stroke={ink} strokeWidth="1.5" />
            <text fill={ink} fontFamily="'Fraunces', serif" fontSize="12.5" fontWeight="600" letterSpacing="2.5">
                <textPath href={`#ring-${id}`} startOffset="2%">REPUBLIC OF THE PHILIPPINES</textPath>
            </text>
            <text fill={ink} fontFamily="'Fraunces', serif" fontSize="12.5" fontWeight="600" letterSpacing="2.5">
                <textPath href={`#ring-${id}`} startOffset="55%">STA. FILOMENA · DIPOLOG</textPath>
            </text>
            {[-90, 210].map((a, i) => {
                const r = (a * Math.PI) / 180;
                return (
                    <g key={i} transform={`translate(${100 + 74 * Math.cos(r)} ${100 + 74 * Math.sin(r)})`}>
                        <polygon
                            points={Array.from({ length: 10 }).map((_, j) => {
                                const rad = j % 2 === 0 ? 5 : 2;
                                const ang = (j * 36 - 90) * (Math.PI / 180);
                                return `${rad * Math.cos(ang)},${rad * Math.sin(ang)}`;
                            }).join(" ")}
                            fill={ink}
                        />
                    </g>
                );
            })}
            <g transform="translate(100 96)">
                <circle r="16" fill={ink} opacity="0.12" />
                <circle r="9" fill={ink} />
                {Array.from({ length: 12 }).map((_, i) => {
                    const a = (i * 30 * Math.PI) / 180;
                    return (
                        <line key={i} x1={13 * Math.cos(a)} y1={13 * Math.sin(a)}
                              x2={20 * Math.cos(a)} y2={20 * Math.sin(a)}
                              stroke={ink} strokeWidth="2" strokeLinecap="round" />
                    );
                })}
            </g>
            <text x="100" y="132" textAnchor="middle" fill={ink}
                  fontFamily="'Fraunces', serif" fontSize="11" fontWeight="600" letterSpacing="3">
                EST · 1961
            </text>
        </svg>
    );
}
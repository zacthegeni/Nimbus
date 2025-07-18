import React from 'react';

interface Props { url: string }

export default function LinkCard({ url }: Props) {
  return (
    <div className="link-card">
      <a href={url} target="_blank" rel="noreferrer">{url}</a>
    </div>
  );
}

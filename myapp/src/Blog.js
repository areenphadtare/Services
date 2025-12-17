 import React, { useEffect, useState } from 'react';

const allUpdates = [
  { category: 'Top Apps',
     title: 'ChatMaster hits 100M downloads!',
      description: 'ChatMaster, the popular messaging app, just reached 100 million downloads worldwide.' },
  { category: 'Companies', 
    title: 'TechSoft acquires InnovateX',
     description: 'In a landmark deal, TechSoft acquires InnovateX to expand its AI research capabilities.' },
  { category: 'New Records',
     title: 'QuantumComp breaks speed record',
     description: 'QuantumComp’s new processor completes complex calculations 5x faster than before.' },
  { category: 'Top Apps',
     title: 'PhotoSnap launches AI filters',
      description: 'PhotoSnap app introduces real-time AI filters for stunning photos and videos.' },
  { category: 'Companies',
     title: 'Cloudify raises $200M in Series C',
      description: 'Cloudify secures $200 million in Series C funding to accelerate cloud services expansion.' },
  { category: 'New Records', 
    title: 'OpenCode hits 1 million commits',
     description: 'OpenCode’s open-source repo surpasses 1 million commits from contributors worldwide.' },
  { category: 'Top Apps', 
    title: 'FitTrack integrates sleep monitoring',
     description: 'FitTrack app now monitors sleep patterns using advanced sensors.' },
  { category: 'Companies', 
    title: 'DevWorks opens new innovation center',
     description: 'DevWorks launches a new research center focused on sustainable tech solutions.' },
  { category: 'New Records',
     title: 'NetSpeed achieves 10 Gbps worldwide',
      description: 'NetSpeed rolls out 10 Gbps internet connectivity across multiple countries.' },
];

const getRandomUpdates = (num = 5) => {
  const shuffled = [...allUpdates].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, num);
};

function Blog() {
  const [updates, setUpdates] = useState([]);

  useEffect(() => {
    setUpdates(getRandomUpdates());
  }, []);

  return (
    <>
      <style>
        {`
        .blog-container {
          max-width: 900px;
          margin: 40px auto;
          padding: 35px;
          background: #f0f4f8;
          border-radius: 12px;
          box-shadow: 0 6px 20px rgba(0, 0, 0, 0.07);
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
          color: #222;
        }
        .blog-title {
          font-size: 2.8rem;
          color: #0056b3;
          text-align: center;
          margin-bottom: 12px;
          font-weight: 700;
          letter-spacing: 1px;
          text-shadow: 1px 1px 3px rgba(0, 86, 179, 0.3);
        }
        .blog-intro {
          text-align: center;
          font-size: 1.15rem;
          color: #555;
          margin-bottom: 30px;
          font-style: italic;
        }
        .blog-updates {
          display: flex;
          flex-direction: column;
          gap: 30px;
        }
        .blog-card {
          background: #f9fbff;
          border-left: 8px solid #0056b3;
          border-radius: 10px;
          padding: 20px 25px;
          box-shadow: 0 2px 10px rgba(0, 86, 179, 0.1);
          opacity: 0;
          transform: translateY(40px);
          animation-fill-mode: forwards;
          animation-timing-function: ease-out;
          position: relative;
          overflow: hidden;
        }
        .category {
          font-weight: 700;
          font-size: 0.9rem;
          padding: 5px 12px;
          border-radius: 15px;
          color: white;
          position: absolute;
          top: 20px;
          right: 20px;
          box-shadow: 0 0 8px rgba(0,0,0,0.1);
          text-transform: uppercase;
          letter-spacing: 1.5px;
          user-select: none;
          cursor: default;
          transition: background-color 0.3s ease;
        }
        .category-top-apps {
          background-color: #007bff;
        }
        .category-companies {
          background-color: #28a745;
        }
        .category-new-records {
          background-color: #dc3545;
        }
        .blog-heading {
          margin: 0 0 12px 0;
          font-size: 1.5rem;
          color: #003d80;
          transition: color 0.3s ease;
        }
        .blog-card:hover .blog-heading {
          color: #007bff;
          text-decoration: underline;
          cursor: pointer;
        }
        .blog-desc {
          font-size: 1.05rem;
          line-height: 1.6;
          color: #444;
        }
        @keyframes fadeSlideIn {
          from {
            opacity: 0;
            transform: translateY(40px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .fade-slide-in {
          animation-name: fadeSlideIn;
        }
        .category:hover {
          filter: brightness(1.2);
          box-shadow: 0 0 15px rgba(0,0,0,0.2);
          animation:ease-in-out;
        }
      `}
      </style>

      <div className="blog-container">
        <h1 className="blog-title">📢 Latest Development News & Records</h1>
        <p className="blog-intro">
          Stay ahead with the freshest updates from top apps, companies, and breakthrough records in the tech world.
        </p>

        <div className="blog-updates">
          {updates.map((update, i) => (
            <article
              key={i}
              className="blog-card fade-slide-in"
              style={{ animationDelay: `${i * 0.3}s` }}
            >
              <span className={`category category-${update.category.toLowerCase().replace(' ', '-')}`}>
                {update.category}
              </span>
              <h2 className="blog-heading">{update.title}</h2>
              <p className="blog-desc">{update.description}</p>
            </article>
          ))}
        </div>
      </div>
    </>
  );
}

export default Blog;

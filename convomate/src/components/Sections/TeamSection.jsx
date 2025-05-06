import React, { useState } from 'react';
import '../../assets/css/style.css'; // Assuming your CSS is in this path
import Team1 from '../../assets/img/team-1.jpeg';
import Team2 from '../../assets/img/team-2.jpeg';
import Team3 from '../../assets/img/team-3.jpeg';
import Team4 from '../../assets/img/team-4.jpeg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes, faGraduationCap, faGlobe, faLightbulb, faHandsHelping, faBook, faHeart } from '@fortawesome/free-solid-svg-icons';
import { faLinkedinIn, faGithub } from '@fortawesome/free-brands-svg-icons';

const TeamSection = () => {
  const [selectedMember, setSelectedMember] = useState(null);

  const teamMembers = [
    // ... (your teamMembers array remains the same)
    {
          id: 1,
          name: "Suyash Shevade",
          role: "Backend Developer",
          image: Team1,
          bio: "Specializes in Node.js and database architecture. Passionate about building scalable server solutions.",
          education: "Computer Science Graduate",
          skills: ["Node.js", "Express", "MongoDB", "SQL"],
          social: {
            linkedin: "#",
            github: "#",
            portfolio: "#"
          },
          fullBio: "With a strong foundation in computer science, I specialize in backend development using Node.js. I have experience building RESTful APIs and working with both SQL and NoSQL databases. My passion lies in creating efficient, scalable server architectures that can handle high traffic loads while maintaining performance."
        },
        {
          id: 2,
          name: "Taranjeet Kaur",
          role: "Frontend Developer",
          image: Team2,
          bio: "Creative UI/UX enthusiast with expertise in React and modern CSS frameworks.",
          education: "Web Development Certification",
          skills: ["React", "JavaScript", "CSS3", "Responsive Design"],
          social: {
            linkedin: "#",
            github: "#",
            portfolio: "#"
          },
          fullBio: "As a frontend developer, I bridge the gap between design and technology. I create beautiful, intuitive interfaces using React and modern CSS techniques. With a keen eye for design and user experience, I ensure our applications are not only functional but also delightful to use."
        },
        {
          id: 3,
          name: "Abhijeet Borkar",
          role: "Frontend Developer",
          image: Team3,
          bio: "Focuses on creating interactive user experiences with clean, maintainable code.",
          education: "Information Technology Graduate",
          skills: ["React", "Redux", "TypeScript", "Bootstrap"],
          social: {
            linkedin: "#",
            github: "#",
            portfolio: "#"
          },
          fullBio: "I specialize in building complex frontend applications with React and TypeScript. My focus is on creating maintainable, well-structured code that scales. I'm particularly interested in state management solutions and optimizing frontend performance for better user experiences."
        },
        {
          id: 4,
          name: "Roshan Anand",
          role: "Machine Learning Engineer",
          image: Team4,
          bio: "Passionate about AI and data science. Enjoys implementing ML models to solve real-world problems.",
          education: "AI & Machine Learning Specialization",
          skills: ["Python", "TensorFlow", "Data Analysis", "NLP"],
          social: {
            linkedin: "#",
            github: "#",
            portfolio: "#"
          },
          fullBio: "As our machine learning specialist, I develop and implement AI models to solve complex problems. My expertise includes natural language processing and predictive analytics. I'm passionate about making AI accessible and creating solutions that have real-world impact."
        }
  ];

  const handleMemberClick = (member) => {
    setSelectedMember(member);
  };

  const closeDetails = () => {
    setSelectedMember(null);
  };

  return (
    <section id="team" className="team-section">
      <div>
        <div className="section-header">
          <h2>Meet Our Team</h2>
          <p className="section-subtitle">A group of passionate freshers ready to make an impact</p>
        </div>

        <div className="team-intro">
          <p>
            We are a team of recent graduates and self-taught developers who believe in the power of
            collaboration and continuous learning. Though we're new to the industry, we bring fresh
            perspectives, up-to-date knowledge, and boundless enthusiasm to every project.
          </p>
        </div>

        <div className="team-members-grid">
          <div className="row"> {/* Added a 'row' here to contain the grid items */}
            {teamMembers.map((member) => (
              <div className="col-lg-3 col-md-6" key={member.id}>
                <div
                  className={`team-member-card ${selectedMember?.id === member.id ? 'active' : ''}`}
                  onClick={() => handleMemberClick(member)}
                >
                  <div className="member-image">
                    <img src={member.image} alt={member.name} />
                    <div className="image-overlay">
                      <div className="social-links">
                        <a href={member.social.linkedin} aria-label={`${member.name} LinkedIn`}>
                          <FontAwesomeIcon icon={faLinkedinIn} />
                        </a>
                        <a href={member.social.github} aria-label={`${member.name} GitHub`}>
                          <FontAwesomeIcon icon={faGithub} />
                        </a>
                        {member.social.portfolio && (
                          <a href={member.social.portfolio} aria-label={`${member.name} Portfolio`}>
                            <FontAwesomeIcon icon={faGlobe} />
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="member-basic-info">
                    <h3>{member.name}</h3>
                    <span className="role">{member.role}</span>
                    <p className="bio">{member.bio}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {selectedMember && (
          <div className="team-member-details show">
            <button className="close-details" onClick={closeDetails}>
              <FontAwesomeIcon icon={faTimes} />
            </button>
            <div className="details-content">
              <div className="details-left">
                <img src={selectedMember.image} alt={selectedMember.name} />
                <div className="social-links">
                  <a href={selectedMember.social.linkedin} target="_blank" rel="noopener noreferrer">
                    <FontAwesomeIcon icon={faLinkedinIn} />
                  </a>
                  <a href={selectedMember.social.github} target="_blank" rel="noopener noreferrer">
                    <FontAwesomeIcon icon={faGithub} />
                  </a>
                  {selectedMember.social.portfolio && (
                    <a href={selectedMember.social.portfolio} target="_blank" rel="noopener noreferrer">
                      <FontAwesomeIcon icon={faGlobe} />
                    </a>
                  )}
                </div>
              </div>
              <div className="details-right">
                <h2>{selectedMember.name}</h2>
                <h3>{selectedMember.role}</h3>
                <div className="education">
                  <FontAwesomeIcon icon={faGraduationCap} />
                  <span>{selectedMember.education}</span>
                </div>
                <div className="full-bio">
                  <p>{selectedMember.fullBio}</p>
                </div>
                <div className="skills-section">
                  <h4>Skills & Expertise</h4>
                  <div className="skill-tags">
                    {selectedMember.skills.map((skill, index) => (
                      <span key={index} className="skill-tag">{skill}</span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="team-values">
          <h3>Our Values</h3>
          <div className="values-grid">
            <div className="value-item">
              <FontAwesomeIcon icon={faLightbulb} />
              <h4>Innovation</h4>
              <p>We embrace new ideas and creative problem-solving</p>
            </div>
            <div className="value-item">
              <FontAwesomeIcon icon={faHandsHelping} />
              <h4>Collaboration</h4>
              <p>We believe the best solutions come from teamwork</p>
            </div>
            <div className="value-item">
              <FontAwesomeIcon icon={faBook} />
              <h4>Continuous Learning</h4>
              <p>We're committed to constantly improving our skills</p>
            </div>
            <div className="value-item">
              <FontAwesomeIcon icon={faHeart} />
              <h4>Passion</h4>
              <p>We love what we do and it shows in our work</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TeamSection;
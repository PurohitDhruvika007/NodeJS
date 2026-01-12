import "./Footer.css";

const Footer = () => {
    return (
        <footer className="footer">
            <div className="footer-content">
                <h3>BlogSphere</h3>
                <p>© {new Date().getFullYear()} Blog Management System</p>
                <span>Built with MERN Stack</span>
            </div>
        </footer>
    );
};

export default Footer;

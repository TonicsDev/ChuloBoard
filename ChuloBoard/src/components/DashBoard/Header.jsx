function Header({collapse, toggleCollapse}) {
    return(
        <header className="header-menu">
            <div className="box-icon" onClick={toggleCollapse}>
                <span className={`icon ${!collapse ? "icon-open" : ""}`}></span>
            </div>
        </header>
    )
}

export default Header;
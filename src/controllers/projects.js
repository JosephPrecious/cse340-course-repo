const showProjectsPage = async (req, res) => {
    const title = 'Projects';
    res.render('projects', { title });
};

export { showProjectsPage };
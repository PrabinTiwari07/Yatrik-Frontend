const Dashboard = () => {
    return (
        <div>
            <h2 className="text-xl font-bold mb-4">Analytics Dashboard</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white p-6 rounded shadow">📊 Total Income Chart Here</div>
                <div className="bg-white p-6 rounded shadow">📈 Booking Overview</div>
            </div>
        </div>
    );
};

export default Dashboard;

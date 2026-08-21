import { useEffect, useState } from "react";
import axios from "axios";

function PredictiveMaintenance() {

    const [dashboard, setDashboard] = useState({});
    const [health, setHealth] = useState([]);
    const [schedule, setSchedule] = useState([]);
    const [alerts, setAlerts] = useState([]);

    useEffect(() => {
        loadData();
    }, []);

    const loadData = async () => {

        const dashboardRes = await axios.get("http://127.0.0.1:8000/maintenance-dashboard");
        const healthRes = await axios.get("http://127.0.0.1:8000/equipment-health");
        const scheduleRes = await axios.get("http://127.0.0.1:8000/maintenance-schedule");
        const alertRes = await axios.get("http://127.0.0.1:8000/recent-maintenance-alerts");

        setDashboard(dashboardRes.data);
        setHealth(healthRes.data);
        setSchedule(scheduleRes.data);
        setAlerts(alertRes.data);
    };

    return (
        <div className="container mt-4">

            <h2 className="mb-4">
                Predictive Maintenance Dashboard
            </h2>

            {/* KPI Cards */}

            <div className="row">

                <div className="col-md-3">
                    <div className="card shadow p-3">
                        <h6>Total Assets</h6>
                        <h2>{dashboard.total_assets}</h2>
                    </div>
                </div>

                <div className="col-md-3">
                    <div className="card shadow p-3">
                        <h6>Healthy</h6>
                        <h2>{dashboard.healthy_assets}</h2>
                    </div>
                </div>

                <div className="col-md-3">
                    <div className="card shadow p-3">
                        <h6>Critical</h6>
                        <h2>{dashboard.critical_assets}</h2>
                    </div>
                </div>

                <div className="col-md-3">
                    <div className="card shadow p-3">
                        <h6>Active Alerts</h6>
                        <h2>{dashboard.active_alerts}</h2>
                    </div>
                </div>

            </div>

            <br />

            {/* Equipment Health */}

            <div className="card shadow">

                <div className="card-header">
                    Equipment Health
                </div>

                <div className="card-body">

                    <table className="table table-striped">

                        <thead>

                            <tr>
                                <th>Asset</th>
                                <th>Score</th>
                                <th>Status</th>
                            </tr>

                        </thead>

                        <tbody>

                            {
                                health.slice(0,10).map((item)=>(
                                    <tr key={item.health_id}>
                                        <td>{item.asset_id}</td>
                                        <td>{item.health_score}</td>
                                        <td>{item.health_status}</td>
                                    </tr>
                                ))
                            }

                        </tbody>

                    </table>

                </div>

            </div>

            <br />

            {/* Maintenance Schedule */}

            <div className="card shadow">

                <div className="card-header">
                    Maintenance Schedule
                </div>

                <div className="card-body">

                    <table className="table table-bordered">

                        <thead>

                            <tr>
                                <th>Asset</th>
                                <th>Date</th>
                                <th>Priority</th>
                            </tr>

                        </thead>

                        <tbody>

                            {
                                schedule.slice(0,10).map((item)=>(
                                    <tr key={item.schedule_id}>
                                        <td>{item.asset_id}</td>
                                        <td>{item.predicted_date}</td>
                                        <td>{item.priority}</td>
                                    </tr>
                                ))
                            }

                        </tbody>

                    </table>

                </div>

            </div>

            <br />

            {/* Recent Alerts */}

            <div className="card shadow">

                <div className="card-header">
                    Recent Alerts
                </div>

                <div className="card-body">

                    <table className="table table-hover">

                        <thead>

                            <tr>
                                <th>Asset</th>
                                <th>Severity</th>
                                <th>Message</th>
                            </tr>

                        </thead>

                        <tbody>

                            {
                                alerts.map((item)=>(
                                    <tr key={item.alert_id}>
                                        <td>{item.asset_id}</td>
                                        <td>{item.severity}</td>
                                        <td>{item.message}</td>
                                    </tr>
                                ))
                            }

                        </tbody>

                    </table>

                </div>

            </div>

        </div>
    );
}

export default PredictiveMaintenance;
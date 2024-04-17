import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';

const datas = [
    {
        name: "Lorem Ipsum 1",
        userName: "Admin",
    },
    {
        name: "Lorem Ipsum 2",
        userName: "Peter Marcin",
    },
    {
        name: "Lorem Ipsum 3",
        userName: "Adrian Ihring",
    },
    {
        name: "Lorem Ipsum 4",
        userName: "Nepoviem ti",
    }
];

const ArticleBrowserPage = ({ onSelect }) => {
    return (
        <div className="card">
            <DataTable value={datas} paginator rows={50} rowsPerPageOptions={[50, 75, 100, 1000]} tableStyle={{ minWidth: '50rem' }}>
                <Column field="name" header="Name" style={{ width: '25%' }}></Column>
                <Column field="userName" header="UserName" style={{ width: '25%' }}></Column>
            </DataTable>
        </div>
    );
};

export default ArticleBrowserPage;
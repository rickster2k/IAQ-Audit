type AdminTabSelectorProps = {
    setter: (tab: string) => void,
    activeTab: string
}
export default function AdminTabSelector({setter ,activeTab}:AdminTabSelectorProps){
    return (
        <div className="flex flex-wrap gap-1 bg-slate-100 p-1 rounded-lg mb-6 w-fit">
            <button onClick={() => setter('audits')} className={`px-4 py-2 rounded-md text-sm font-medium ${activeTab === 'audits' ? 'bg-white shadow-sm' : 'text-slate-500'}`}>Audits</button>
            <button onClick={() => setter('support')} className={`px-4 py-2 rounded-md text-sm font-medium ${activeTab === 'support' ? 'bg-white shadow-sm' : 'text-slate-500'}`}>Support</button>
            <button onClick={() => setter('announcements')} className={`px-4 py-2 rounded-md text-sm font-medium ${activeTab === 'announcements' ? 'bg-white shadow-sm' : 'text-slate-500'}`}>Announcements</button>
            <button onClick={() => setter('settings')} className={`px-4 py-2 rounded-md text-sm font-medium ${activeTab === 'settings' ? 'bg-white shadow-sm' : 'text-slate-500'}`}>Settings</button>
      </div>
    )
}
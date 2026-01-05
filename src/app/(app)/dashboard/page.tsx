
export default function DashboardPage() {
    return (
        <div className="flex flex-col gap-6">
            <h1 className="text-2xl font-semibold">Asset Management Executive Dashboard</h1>
            <iframe
                width="100%"
                height="720"
                src="https://us-east-1.quicksight.aws.amazon.com/sn/embed/share/accounts/430248170338/dashboards/f9ae3294-c908-483f-91ef-8469921e94e7?directory_alias=Keerthisri"
                style={{ border: 'none' }}
                >
            </iframe>
        </div>
    );
}

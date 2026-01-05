"use client";

export default function DashboardPage() {
  return (
    <div className="flex flex-col h-full -m-4 sm:-m-6">
      <div className="flex-1 p-4 sm:p-6">
        <iframe
          width="100%"
          height="100%"
          src="https://us-east-1.quicksight.aws.amazon.com/sn/embed/share/accounts/430248170338/dashboards/f9ae3294-c908-483f-91ef-8469921e94e7?directory_alias=Keerthisri"
          style={{ border: 'none' }}
        >
        </iframe>
      </div>
    </div>
  );
}

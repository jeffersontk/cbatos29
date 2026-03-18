import MembersManagementClient from "@/components/dashboard/MembersManagementClient";
import { members, ministryInterests } from "@/lib/platform/data";

export default function MembersPage() {
  return <MembersManagementClient initialMembers={members} ministryInterests={ministryInterests} />;
}

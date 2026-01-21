'use client';

import { useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { useFirestore, useUser, useMemoFirebase } from '@/firebase';
import { useCollection } from '@/firebase/firestore/use-collection';
import { collectionGroup } from 'firebase/firestore';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import AnimatedSection from '@/components/animated-section';
import type { Applicant } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { getAuth, signOut } from 'firebase/auth';

export default function AdminDashboard() {
  const { user, isUserLoading } = useUser();
  const router = useRouter();
  const firestore = useFirestore();

  const applicantsQuery = useMemoFirebase(() => {
    if (!firestore) return null;
    return collectionGroup(firestore, 'applicants');
  }, [firestore]);

  const { data: applicants, isLoading, error } = useCollection<Applicant>(applicantsQuery);

  const handleSignOut = () => {
    const auth = getAuth();
    signOut(auth).then(() => {
      router.push('/admin/login');
    });
  };

  if (isUserLoading) {
    return <div className="flex h-screen items-center justify-center">Loading...</div>;
  }

  if (!user) {
    router.push('/admin/login');
    return null;
  }

  return (
    <div className="container mx-auto py-10 px-4">
      <AnimatedSection>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Training Applicants</CardTitle>
            <Button onClick={handleSignOut} variant="outline">Sign Out</Button>
          </CardHeader>
          <CardContent>
            {isLoading && <p>Loading applications...</p>}
            {error && <p className="text-destructive">Error loading applications: You may not have permission to view this data.</p>}
            {!isLoading && !error && (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Training Module</TableHead>
                    <TableHead>Application Date</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {applicants && applicants.length > 0 ? (
                    applicants.map((applicant) => (
                      <TableRow key={applicant.id}>
                        <TableCell>{applicant.firstName} {applicant.lastName}</TableCell>
                        <TableCell>{applicant.email}</TableCell>
                        <TableCell>{applicant.trainingModuleId}</TableCell>
                        <TableCell>{new Date(applicant.applicationDate).toLocaleDateString()}</TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={4} className="text-center">
                        No applications found.
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            )}
          </CardContent>
        </Card>
      </AnimatedSection>
    </div>
  );
}

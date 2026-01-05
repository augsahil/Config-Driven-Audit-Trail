import { useState, useEffect } from 'react'
import axios from 'axios'

interface AuditLog {
  _id: string
  timestamp: string
  entity: string
  entityId: string
  action: string
  actorId: string
  diff: any
  requestId: string
}

const Audits = () => {
  const [audits, setAudits] = useState<AuditLog[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [limit, setLimit] = useState(20)

  useEffect(() => {
    fetchAudits()
  }, [limit])

  const fetchAudits = async () => {
    try {
      const response = await axios.get(`/api/audits?limit=${limit}`)
      const data = response.data || {}
      const items = data.items || []
      setAudits(items)
    } catch (error) {
      console.error('Error fetching audits:', error)
      setAudits([])
    } finally {
      setIsLoading(false)
    }
  }

  const renderDiff = (diff: any) => {
    if (!diff || !diff.changedFields) return null

    return (
      <div className="text-xs">
        {diff.changedFields.map((field: string) => (
          <div key={field} className="text-blue-600">
            <strong>{field}:</strong> {diff[field]?.before || 'null'} → {diff[field]?.after || 'null'}
          </div>
        ))}
      </div>
    )
  }

  if (isLoading) {
    return <div className="text-center">Loading audit logs...</div>
  }

  return (
    <div className="px-4 sm:px-6 lg:px-8">
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-2xl font-semibold text-gray-900">Audit Logs</h1>
          <p className="mt-2 text-sm text-gray-700">
            A list of all audit logs in the system.
          </p>
        </div>
        <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
          <select
            value={limit}
            onChange={(e) => setLimit(Number(e.target.value))}
            className="inline-flex items-center justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            <option value={10}>Last 10</option>
            <option value={20}>Last 20</option>
            <option value={50}>Last 50</option>
            <option value={100}>Last 100</option>
          </select>
        </div>
      </div>

      <div className="mt-8 flex flex-col">
        <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
            <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
              <table className="min-w-full divide-y divide-gray-300">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">
                      Timestamp
                    </th>
                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                      Entity
                    </th>
                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                      Action
                    </th>
                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                      Actor ID
                    </th>
                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                      Changes
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 bg-white">
                  {audits.map((audit) => (
                    <tr key={audit._id}>
                      <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm text-gray-900 sm:pl-6">
                        {new Date(audit.timestamp).toLocaleString()}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                        {audit.entity} ({audit.entityId})
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          audit.action === 'create' ? 'bg-green-100 text-green-800' :
                          audit.action === 'update' ? 'bg-blue-100 text-blue-800' :
                          audit.action === 'delete' ? 'bg-red-100 text-red-800' :
                          'bg-gray-100 text-gray-800'
                        }`}>
                          {audit.action}
                        </span>
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                        {audit.actorId}
                      </td>
                      <td className="px-3 py-4 text-sm text-gray-500">
                        {renderDiff(audit.diff)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Audits